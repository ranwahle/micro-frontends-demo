function shellAppClient() {

}

shellAppClient.prototype.notifyLoaded =  function() {
    if (window.parent && window.parent.microAppsEventsManager && window.parent.microAppsEventsManager.publish) {
        window.parent.microAppsEventsManager.publish('loaded', {appName: 'team-details'})
    }
}