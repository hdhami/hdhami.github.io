const getAppEntries = (isProduction, path, rootPath) => {
    {
        const appEntries = [path.join(rootPath, 'app/components/root/app.client.js')];

        return {
            pagination: appEntries
        };
    }
};

const getEntries = (isProduction, path, rootPath) => getAppEntries(isProduction, path, rootPath);

export { getEntries, getAppEntries };
