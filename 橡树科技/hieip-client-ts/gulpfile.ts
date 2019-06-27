import {Gulpclass, Task} from 'gulpclass/Decorators'
import * as gulp from 'gulp'
import * as del from 'del'
import * as fs from 'fs'
import {GenerateEntity} from './gulpClass/GenerateEntity'
import {GenerateRestfulApi} from './gulpClass/GenerateResufulApi'
import {GeneratePoint} from './gulpClass/GeneratePoint'
import {GeneratePreparationText} from './gulpClass/GeneratePreparationText'

const ts = require('gulp-typescript')

@Gulpclass()
export class Gulpfile {
    @Task()
    clean() {
        return del(['dist', '.awcache'])
    }

    @Task()
    generateEntity() {
        return Promise.all([new GenerateEntity({
            entityPackage: 'com.hieip.model',
            sourceModulePath: 'src/packages/server',
            outDTsPath: 'index.d.ts',
            outMappingPath: 'mapping.json',
        }).taskStart(), new GenerateEntity({
            entityPackage: 'com.medical.model',
            sourceModulePath: 'src/packages/medical-server',
            outDTsPath: 'medical.d.ts',
            outMappingPath: 'medical_mapping.json',
        }).taskStart(), new GenerateEntity({
            entityPackage: 'com.nurse.model',
            sourceModulePath: 'src/packages/medical-server',
            outDTsPath: 'nurse.d.ts',
            outMappingPath: 'nurse_mapping.json',
        }).taskStart()])
    }

    @Task(null, ['generateApi3'])
    generateApi() {
        return del([
            'src/packages/api/index.ts',
            'src/packages/api/medical.ts',
            'src/packages/api/nurse.ts',
        ])
    }

    @Task()
    generateApi2() {
        return Promise.all([new GenerateRestfulApi({
            sourceModulePath: 'src/packages/server',
            controllerPackage: 'com.hieip.controller',
            mappingPath: '../src/packages/entity/mapping.json',
            importApi: 'apiUtil',
            fromApi: '../entity',
            outFileName: 'index.ts',
        }).taskStart(), new GenerateRestfulApi({
            sourceModulePath: 'src/packages/medical-server',
            controllerPackage: 'com.medical.controller',
            mappingPath: '../src/packages/entity/medical_mapping.json',
            importApi: 'medicalApi as apiUtil',
            fromApi: '../entity/medical',
            outFileName: 'medical.ts',
        }).taskStart(), new GenerateRestfulApi({
            sourceModulePath: 'src/packages/medical-server',
            controllerPackage: 'com.nurse.controller',
            mappingPath: '../src/packages/entity/nurse_mapping.json',
            importApi: 'medicalApi as apiUtil',
            fromApi: '../entity/nurse',
            outFileName: 'nurse.ts',
        }).taskStart()])
    }

    @Task(null, ['generateApi2'])
    generateApi3() {
        return gulp.src([
            'src/packages/api/index.ts',
            'src/packages/api/medical.ts',
            'src/packages/api/nurse.ts',
        ]).pipe(ts({
            declaration: true,
            'target': 'es5',
            rootDir: __dirname,
            'types': [
                'node'
            ],
            lib: ['es2017', 'dom'],
            'noResolve': false
        })).pipe(gulp.dest('src/packages/api'))
    }

    @Task()
    generatePoint() {
        return GeneratePoint.taskStart()
    }

    @Task()
    generatePreparationText() {
        return new GeneratePreparationText().start()
    }

    @Task()
    writeHicipPackage() {
        const json = require('./package.json')
        json.scripts = {
            test: 'echo no test'
        }
        json.dependencies = {}
        delete json.devDependencies
        delete json.jest
        delete json['lint-staged']
        delete json.build
        json.main = 'electron-main.js'
        fs.writeFileSync('./dist/hieip/package.json', JSON.stringify(json, null, 2))
        fs.writeFileSync('./dist/hieip/electron-main.js', fs.readFileSync('./test/electron-main.js').toString()
            .replace(/^\s+/gm, '').replace(/^\s*\/\/.*$/gm, '').replace(/;$/gm, '').replace(/ ([=+]) /gm, '$1')
            .replace(/([:,)>]) /gm, '$1').replace(/^\s*$/gm, ''))
    }
}