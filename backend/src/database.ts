import { createPool } from 'mysql2/promise';

export async function connect() {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: '42337856',
        database: 'DBVenta',
        connectionLimit: 10
    });

    return connection;
}