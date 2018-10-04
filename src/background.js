/*global chrome*/

const DATA_URL =
  "https://gist.githubusercontent.com/fansserials/897e77f4f293d138ed0b8ac85dc92e59/raw";
let listener = undefined;

const loadLocalData = () => {
  chrome.storage.local.get(["banned", "redirectTo"], value => {
    if (!(value.banned && value.banned.length) || !value.redirectTo) {
      fetchData();
      return;
    }

    if (listener) {
      console.log("Remove previous redirect listener");
      chrome.webRequest.onBeforeRequest.removeListener(listener);
    }

    listener = details => {
      console.log("Redirecting from", details.url, "to", value.redirectTo);
      const redirectTo = new URL(value.redirectTo);
      redirectTo.pathname = new URL(details.url).pathname;
      return {
        redirectUrl: redirectTo.toString()
      };
    };

    console.log("Add new redirect listener");
    chrome.webRequest.onBeforeRequest.addListener(
      listener,
      { urls: value.banned },
      ["blocking"]
    );
  });
};

const fetchData = () => {
  fetch(DATA_URL)
    .then(response => response.json())
    .then(json => {
      console.log("Response retrieved", json);
      chrome.storage.local.set(json.sites[0], () => {
        console.log("New data is saved");
        loadLocalData();
      });
    })
    .catch(err => {
      console.log(err);
      setTimeout(fetchData, 7000);
    });
};

// Update every 5 minutes
chrome.alarms.create("update", {
  periodInMinutes: 5
});
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "update") return;
  console.log('update');
  fetchData();
});

fetchData();
loadLocalData();