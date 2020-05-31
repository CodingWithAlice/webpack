class EndWebpackPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply(compiler) {
        compiler.plugin('done', (stats) => {
            // 在done事件中回调doneCallback
            this.doneCallback(stats);
        });

        compiler.plugin('failed', (err) => {
            // 在failed事件中回调failCallback
            this.failCallback(err);
        });
    };
}

module.exports = EndWebpackPlugin;