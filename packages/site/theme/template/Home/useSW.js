import {getSettingState} from '../utils/index'
const settingState = getSettingState();

window.regiserSW = () => {
  if (Reflect.has(window.navigator, "serviceWorker")) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        window.registration = registration;
        console.log("SW registered: ");
        if (registration.waiting) {
          console.log("SW 需要更新");
          return;
        }
      })
      .catch((registrationError) => {
        window.registrationError = registrationError;
        console.log("SW registration failed: ");
      });
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
      console.log("registration.update();");
    });
  }
};

window.unRegisterSW = () => {
  const serviceWorker = navigator.serviceWorker;

  serviceWorker.getRegistrations
    ? serviceWorker.getRegistrations().then(function (sws) {
        sws.forEach(function (sw) {
          sw.unregister();
          console.log("sw unregister 1");
        });
      })
    : serviceWorker.getRegistration &&
      serviceWorker.getRegistration().then(function (sw) {
        sw && sw.unregister();
        console.log("sw unregister 2");
      });
};


if(settingState.useSW) {
    window.regiserSW();
}else {
    window.unRegisterSW();
}
