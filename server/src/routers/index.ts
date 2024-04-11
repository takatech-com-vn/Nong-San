import productRoute from './productRoute';

function route(app: any) {
    app.use('/productRoute', productRoute);
}

export = route;
