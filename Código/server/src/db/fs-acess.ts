import fs from 'fs-extra';
import path from 'path';
import { MessageEntity } from '../interfaces/MessageStore';

class FSStore {
    async save<T>(msg: MessageEntity<T>) {
        const dir = await this.ensureDir();
        const path = this.filePath(dir, msg.modelName);
        const data = await fs.writeFile(path, msg.data);
        return data;
    }

    async read(modelName: string) {
        const dir = await this.ensureDir();
        const path = this.filePath(dir, modelName);
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
