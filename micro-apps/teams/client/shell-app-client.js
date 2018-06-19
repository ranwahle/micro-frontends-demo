function shellAppClient() {

}

const myParent = window.parent;

shellAppClient.prototype.notifyLoaded =  function() {
    if (myParent && myParent.microAppsEventsManager && myParent.microAppsEventsManager.publish) {
        myParent.microAppsEventsManager.publish('loaded', {appName: 'teams', context: window})
    }
}

shellAppClient.prototype.registerDataService = function(serviceName, executorFunction)
{
    if (myParent && myParent.microAppsServiceManager) {
        myParent.microAppsServiceManager.registerService(serviceName, executorFunction)
    }
}