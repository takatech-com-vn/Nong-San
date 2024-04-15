import loginRoute from './loginRoute'
import productRoute from './productRoute';


function route(app: any) {
    app.use('/login', loginRoute)
    app.use('/product', productRoute);
}

export = route;
