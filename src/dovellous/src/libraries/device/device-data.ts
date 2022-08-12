import {Device} from '@capacitor/device';
import {App} from '@capacitor/app';
import Framework7 from 'framework7/bundle';

const DeviceData = {

    getDeviceInfo: async (callbackSuccess) => {

        const info = await Device.getInfo();

        callbackSuccess(info);

    },
    getDeviceId: async (callbackSuccess) => {

        const id = await Device.getId();

        callbackSuccess(id);

    },
    getAppInfo: async (callbackSuccess) => {

        DeviceData.getDeviceInfo(async function (deviceInfo) {

            if (deviceInfo.platform !== "web") {

                const info = await App.getInfo();

                callbackSuccess(info);

            } else {

                callbackSuccess(
                    {
                        build: "APP_BUILD",
                        id: "APP_ID",
                        name: "APP_NAME",
                        version: "APP_VERSION"
                    }
                )

            }

        });

    },
    getDeviceData: async (callbackSuccess) => {

        let deviceData = {}

        DeviceData.getDeviceInfo(function (deviceInfo) {

            const deviceName = deviceInfo.name;

            deviceInfo.deviceName = deviceName;

            delete deviceInfo.name;

            deviceData = Framework7.utils.extend(deviceData, deviceInfo);

            DeviceData.getDeviceId(function (deviceId) {

                deviceData = Framework7.utils.extend(deviceData, deviceId);

                DeviceData.getAppInfo(function (appInfo) {

                    deviceData = Framework7.utils.extend(deviceData, appInfo);

                    const deviceString = `${deviceData.id}:${deviceData.manufacturer}:${deviceData.model}:${deviceData.operatingSystem}:${deviceData.uuid}`;

                    DeviceData.getDeviceKey(deviceString, function (deviceKey) {

                        if (typeof callbackSuccess === "function") {

                            callbackSuccess({data: deviceData, key: deviceKey});

                        }

                    });

                });

            });

        });

    },
    getBatteryInfo: async (callbackSuccess) => {

        const info = await Device.getBatteryInfo();

        callbackSuccess(info);
    },
    getDeviceKey: async (deviceString, callbackSuccess) => {

        const hash = CryptoJS.SHA512(deviceString);

        const deviceKey = CryptoJS.enc.Hex.stringify(hash);

        callbackSuccess(deviceKey);

    },

}

export default DeviceData;