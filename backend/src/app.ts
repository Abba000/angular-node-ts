import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//routes
import IndexRoutes from './routes/index.routes';
import CategoriaRoutes from './routes/categoria.routes';
import DetalleVentaRoutes from './routes/detalle-venta.routes';
import MenuRolRoutes from './routes/menu-rol.routes';
import MenuRoutes from './routes/menu.routes';
import NumeroDocumentoRoutes from './routes/numero-documento.routes';
import ProductoRoutes from './routes/producto.routes';
import RolRoutes from './routes/rol.routes';
import UsuarioRoutes from './routes/usuario.routes';
import VentaRoutes from './routes/venta.routes';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/categorias', CategoriaRoutes);
        this.app.use('/detalle-ventas', DetalleVentaRoutes);
        this.app.use('/menu-roles', MenuRolRoutes);
        this.app.use('/menus', MenuRoutes);
        this.app.use('/numeros-documento', NumeroDocumentoRoutes);
        this.app.use('/productos', ProductoRoutes);
        this.app.use('/roles', RolRoutes);
        this.app.use('/usuarios', UsuarioRoutes);
        this.app.use('/ventas', VentaRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port' , this.app.get('port'));
    }

}
