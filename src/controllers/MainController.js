const { Controller } = require('@farahub/framework/foundation');
const { Injection, Lang, Auth, Workspace } = require('@farahub/framework/facades');

class MainController extends Controller {

    /**
     * The controller name
     * 
     * @var string
     */
    name = 'Main';

    /**
     * The controller routes
     * 
     * @var array
     */
    routes = [
        {
            type: 'api',
            method: 'get',
            path: '/history',
            handler: 'list',
        },
    ]

    /**
     * List of people match params
     * 
     * @return void
     */
    list() {
        return [
            Auth.authenticate('jwt', { session: false }),
            Workspace.resolve(this.app),
            Injection.register(this.module, 'main.list'),
            // Validator.validate(new PersonListValidator()),
            async (req, res, next) => {
                try {

                    const { wsConnection: connection } = req;

                    const Sms = connection.model('Sms');

                    const args = req.query;

                    let search = {
                        //
                    }

                    if (args && args.query && args.query !== '') {
                        search = {
                            ...search,
                            ...(
                                Num.isNumeric(args.query) ?
                                    { code: Number(args.query) } :
                                    {
                                        $or: [
                                            { firstName: { $regex: args.query + '.*' } },
                                            { lastName: { $regex: args.query + '.*' } }
                                        ]
                                    }
                            )
                        }
                    }

                    const sort = args && args.sort ? args.sort : "-createdAt";

                    const populationInjections = await req.inject('populate');

                    const query = Sms.find(search)
                        .select('-__v')
                        .populate([
                            // { path: 'receiver' },
                            ...(populationInjections || [])
                        ]);

                    query.sort(sort);

                    const total = await Sms.find(search).count();

                    if (args && args.page > -1) {
                        const perPage = args.perPage || 25;
                        query.skip(args.page * perPage)
                            .limit(perPage)
                    }

                    let data = await query.lean({ virtuals: true });

                    data = Lang.translate(data);

                    return res.json({ ok: true, data, total })
                } catch (error) {
                    next(error);
                }
            }
        ]
    }
}

module.exports = MainController;