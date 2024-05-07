import loginRoute from './loginRoute'
import productRoute from './productRoute';
import policyRoute from './policyRoute';
import slideRoute from './slideRoute';
import newRoute from './newRoute';
import brandRoute from './brandRoute';

function route(app: any) {
    app.use('/login', loginRoute);
    app.use('/product', productRoute);
    app.use('/policy', policyRoute);
    app.use('/slide', slideRoute);
    app.use('/new', newRoute);
    app.use('/brand', brandRoute);
}

export = route;
