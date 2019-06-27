const webpack = require('webpack')
const chalk = require('chalk')
const progress = require('progress')
const objectAssign = require('object-assign')

class ProgressPlugin {

    constructor(options) {
        if (typeof options === "function") {
            options = {
                handler: options
            };
        }
        options = options || {};
        this.profile = options.profile;
        this.handler = options.handler;
    }

    apply(compiler) {
        const handler = this.handler || defaultHandler;
        const profile = this.profile;
        if (compiler.compilers) {
            const states = new Array(compiler.compilers.length);
            compiler.compilers.forEach(function (compiler, idx) {
                compiler.apply(new ProgressPlugin(function (p, msg) {
                    states[idx] = Array.prototype.slice.apply(arguments);
                    handler.apply(null, [
                        states.map(state => state && state[0] || 0).reduce((a, b) => a + b) / states.length,
                        `[${idx}] ${msg}`
                    ].concat(Array.prototype.slice.call(arguments, 2)));
                }));
            });
        } else {
            let lastModulesCount = 0;
            let moduleCount = 500;
            let doneModules = 0;
            const activeModules = [];

            const update = function update(module) {
                handler(
                    0.1 + (doneModules / Math.max(lastModulesCount, moduleCount)) * 0.6,
                    "building modules",
                    `${doneModules}/${moduleCount} modules`,
                    `${activeModules.length} active`,
                    activeModules[activeModules.length - 1]
                );
            };

            const moduleDone = function moduleDone(module) {
                doneModules++;
                const ident = module.identifier();
                if (ident) {
                    const idx = activeModules.indexOf(ident);
                    if (idx >= 0) activeModules.splice(idx, 1);
                }
                update();
            };
            compiler.plugin("compilation", function (compilation) {
                if (compilation.compiler.isChild()) return;
                lastModulesCount = moduleCount;
                moduleCount = 0;
                doneModules = 0;
                handler(0, "compiling");
                compilation.plugin("build-module", function (module) {
                    moduleCount++;
                    const ident = module.identifier();
                    if (ident) {
                        activeModules.push(ident);
                    }
                    update();
                });
                compilation.plugin("failed-module", moduleDone);
                compilation.plugin("succeed-module", moduleDone);
                const syncHooks = {
                    "seal": [0.71, "sealing"],
                    "optimize": [0.72, "optimizing"],
                    "optimize-modules-basic": [0.73, "basic module optimization"],
                    "optimize-modules": [0.74, "module optimization"],
                    "optimize-modules-advanced": [0.75, "advanced module optimization"],
                    "optimize-chunks-basic": [0.76, "basic chunk optimization"],
                    "optimize-chunks": [0.77, "chunk optimization"],
                    "optimize-chunks-advanced": [0.78, "advanced chunk optimization"],
                    // optimize-tree
                    "optimize-chunk-modules": [0.80, "chunk modules optimization"],
                    "optimize-chunk-modules-advanced": [0.81, "advanced chunk modules optimization"],
                    "revive-modules": [0.82, "module reviving"],
                    "optimize-module-order": [0.83, "module order optimization"],
                    "optimize-module-ids": [0.84, "module id optimization"],
                    "revive-chunks": [0.85, "chunk reviving"],
                    "optimize-chunk-order": [0.86, "chunk order optimization"],
                    "optimize-chunk-ids": [0.87, "chunk id optimization"],
                    "before-hash": [0.88, "hashing"],
                    "before-module-assets": [0.89, "module assets processing"],
                    "before-chunk-assets": [0.90, "chunk assets processing"],
                    "additional-chunk-assets": [0.91, "additional chunk assets processing"],
                    "record": [0.92, "recording"]
                };
                Object.keys(syncHooks).forEach(name => {
                    let pass = 0;
                    const settings = syncHooks[name];
                    compilation.plugin(name, () => {
                        if (pass++ > 0)
                            handler(settings[0], settings[1], `pass ${pass}`);
                        else
                            handler(settings[0], settings[1]);
                    });
                });
                compilation.plugin("optimize-tree", (chunks, modules, callback) => {
                    handler(0.79, "module and chunk tree optimization");
                    callback();
                });
                compilation.plugin("additional-assets", callback => {
                    handler(0.91, "additional asset processing");
                    callback();
                });
                compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
                    handler(0.92, "chunk asset optimization");
                    callback();
                });
                compilation.plugin("optimize-assets", (assets, callback) => {
                    handler(0.94, "asset optimization");
                    callback();
                });
            });
            compiler.plugin("emit", (compilation, callback) => {
                handler(0.95, "emitting");
                callback();
            });
            compiler.plugin("done", () => {
                handler(1, "");
            });
        }

        let lineCaretPosition = 0,
            lastState, lastStateTime;

        function defaultHandler(percentage, msg) {
            let state = msg;
            let cwd = process.cwd() + '/';
            const details = Array.prototype.slice.call(arguments, 2);
            if (percentage < 1) {
                percentage = Math.floor(percentage * 100);
                msg = `${percentage}% ${msg}`;
                if (percentage < 100) {
                    msg = ` ${msg}`;
                }
                if (percentage < 10) {
                    msg = ` ${msg}`;
                }
                details.forEach(detail => {
                    if (!detail) return;
                    if (detail.length > 40) {
                        // detail = `...${detail.substr(detail.length - 37)}`;
                        if (detail.indexOf('!') > 0) {
                            detail = `${detail.substr(detail.lastIndexOf('!') + 1)}`;
                        }
                    }
                    detail = detail.replace(cwd, '');
                    msg += ` ${detail}`;
                });
            }
            if (profile) {
                state = state.replace(/^\d+\/\d+\s+/, "");
                if (percentage === 0) {
                    lastState = null;
                    lastStateTime = Date.now();
                } else if (state !== lastState || percentage === 1) {
                    const now = Date.now();
                    if (lastState) {
                        const stateMsg = `${now - lastStateTime}ms ${lastState}`;
                        goToLineStart(stateMsg);
                        process.stderr.write(stateMsg + "\n");
                        lineCaretPosition = 0;
                    }
                    lastState = state;
                    lastStateTime = now;
                }
            }
            goToLineStart(msg);
            process.stderr.write(msg);
        }

        function goToLineStart(nextMessage) {
            let str = "";
            for (; lineCaretPosition > nextMessage.length; lineCaretPosition--) {
                str += "\b \b";
            }
            for (var i = 0; i < lineCaretPosition; i++) {
                str += "\b";
            }
            lineCaretPosition = nextMessage.length;
            if (str) process.stderr.write(str);
        }
    }
}

let messageTemplate = [':bar', chalk.green(':percent'), ':msg'].join(' ')
let progressOptions = {
    complete: chalk.bgGreen(' '),
    incomplete: chalk.bgWhite(' '),
    width: 40,
    total: 100,
    clear: false
}

function SimpleProgressPlugin(options) {
    if (!process.stderr.isTTY) {
        return new ProgressPlugin()
        // if (process.argv.indexOf('--json') > 0) return new webpack.ProgressPlugin()
        // let init = false
        // let length = 60
        // let precentageCount = 0
        // return new webpack.ProgressPlugin(function (percentage) {
        //     if (init === false) {
        //         process.stdout.write(Array(length + 1).join('='))
        //         process.stdout.write('\n')
        //         init = true
        //     }
        //     let nowPercentage = parseInt(percentage * length, 10)
        //     for (let i = 0; i < nowPercentage - precentageCount; i++) {
        //         precentageCount++
        //         process.stdout.write('=')
        //     }
        //     if (nowPercentage === length) {
        //         if (nowPercentage > precentageCount) process.stdout.write('=')
        //         process.stdout.write('\n')
        //     }
        // })
    }

    if (process.platform === 'darwin') {
        let NyanProgressPlugin = require('nyan-progress-webpack-plugin')
        return new NyanProgressPlugin()
    }

    if (options) {
        messageTemplate = options.messageTemplate || messageTemplate
        progressOptions = objectAssign(progressOptions, options.progressOptions)
    }

    const progressBar = new progress(messageTemplate, progressOptions)

    return new webpack.ProgressPlugin(function (percentage, msg) {
        progressBar.update(percentage, {msg: msg})
    })
}

module.exports = SimpleProgressPlugin