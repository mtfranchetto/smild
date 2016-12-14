class Util {

    static formatError(event) {
        if (!event.error) {
            return event.message;
        }
        // PluginError
        if (typeof event.error.showStack === 'boolean') {
            return event.error.toString();
        }
        // Normal error
        if (event.error.stack) {
            return event.error.stack;
        }
        // Unknown (string, number, etc.)
        return new Error(String(event.error)).stack;
    }
}

export default Util