import fs from 'fs-extra';
import path from 'path';

import { Event } from '../repository/Model';

class FSStore {
    async save<T>(messag: Event<T>) {
        const dir = await this.ensureDir();
        const path = this.filePath(dir, messag.model);
        const data = await fs.writeFile(path, messag.data);
        return data;
    }

    async read<T>(messag: Event<T>) {
        const dir = await this.ensureDir();
        const path = this.filePath(dir, messag.model);
        const data = await fs.readFile(path, 'utf8');

        return data;
    }

    async ensureDir() {
        const dir =
            process.env.NOTES_FS_DIR || path.join(__dirname, 'fs-data');

        await fs.ensureDir(dir);

        return dir;
    }

    filePath(dir: string, key: string) {
        return path.join(dir, `${key}.json`);
    }
}

export default new FSStore()
