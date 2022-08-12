import { utils } from 'framework7';

const AppUtils = /**
 * @param {string} object Input text
 * @return {string} Filtered text
 */
 {

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     parseUrlQuerys: (url: any): string => {
        return utils.parseUrlQuery(url);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {object} str Input text
     * @return {string} Filtered text
     */
     serializeObject: (object: any): string => {
        return utils.serializeObject(object);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {function} str Input text
     * @return {void} Filtered text
     */
     nextFrame: (cb: Function): void => {
        utils.nextFrame(function() {
            cb();
          });
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {function} str Input text
     * @param {number} str Input text
     * @return {void} Filtered text
     */
     nextTick: (cb: Function, delay: any): void => {
        utils.nextTick(function() {
            cb();
          }, delay);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @return {number} Filtered text
     */
     now: (): string => {
        return utils.now();
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {Object} str Input text
     * @param {object} str Input text
     * @return {string} Filtered text
     */
     extend: (target: any, ...from: any): string => {
        return utils.extend(target, ...from);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @return {string} Filtered text
     */
     uniqueNumber: (url: any): string => {
        return utils.uniqueNumber();
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     id: (mask, map): string => {
        return utils.id(mask, map);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     preloaderContent: (): string => {
        // call method dynamically based on current app theme
        var preloaderContent = utils[app.theme + 'PreloaderContent'];

        // create required preloader content
        return '<div class="preloader">' + preloaderContent + '</div>';
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     colorHexToRgb: (hexColor: any): string => {
        return utils.colorHexToRgb(hexColor);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {array} Filtered text
     */
     colorRgbToHex: (r,g,b): Array => {
        return utils.colorRgbToHex(r,g,b);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     colorRgbToHsl: (R, G, B): string => {
        return utils.colorRgbToHsl(R, G, B);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     colorHslToRgb: (H, S, L): string => {
        return utils.colorHslToRgb(H, S, L);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     colorHsbToHsl: (H, S, B): string => {
        return utils.colorHsbToHsl(H, S, B);
    },

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @return {string} Filtered text
     */
     colorHslToHsb: (H, S, L): string => {
        return utils.colorHslToHsb(H, S, L);
    },

    /**
     * returns object with generate CSS variables required to set specified theme color.
     *
     * @param {string} hexColor color string
     * @return {string} returns object with required CSS variables and their values.
     */
     colorThemeCSSProperties: (hexColor: any): string => {
        return utils.colorThemeCSSProperties(hexColor);
    },

}

export default AppUtils;