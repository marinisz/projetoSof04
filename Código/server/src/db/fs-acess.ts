import fs from 'fs-extra';
import path from 'path';
import util from 'util';

const filePath = process.env.PATH
export default class FSStore {
    save<T>(data: T) {
        fs.writeFile
    }
}
