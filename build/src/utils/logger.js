"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const format = winston_1.default.format;
const logFormat = format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json(), format.splat()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.Console({
            format: format.combine(format.colorize(), logFormat),
        })
    ],
});
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUE4QjtBQUU5QixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQztBQUU5QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUU5RixNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQztJQUNoQyxLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUNuRCxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ2IsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUNqQjtJQUNELFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUU7SUFDeEMsVUFBVSxFQUFFO1FBQ1IsSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDM0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2xCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFDakIsU0FBUyxDQUNaO1NBQ0osQ0FBQztLQUNMO0NBQ0osQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcblxuY29uc3QgZm9ybWF0ID0gd2luc3Rvbi5mb3JtYXQ7XG5cbmNvbnN0IGxvZ0Zvcm1hdCA9IGZvcm1hdC5wcmludGYoKGluZm8pID0+IGAke2luZm8udGltZXN0YW1wfSAke2luZm8ubGV2ZWx9OiAke2luZm8ubWVzc2FnZX1gKTtcblxuY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgIGxldmVsOiAnaW5mbycsXG4gICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICBmb3JtYXQudGltZXN0YW1wKHsgZm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcycgfSksXG4gICAgICAgIGZvcm1hdC5qc29uKCksXG4gICAgICAgIGZvcm1hdC5zcGxhdCgpLFxuICAgICksXG4gICAgZGVmYXVsdE1ldGE6IHsgc2VydmljZTogJ3VzZXItc2VydmljZScgfSxcbiAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIGZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICAgIGxvZ0Zvcm1hdCxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pXG4gICAgXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iXX0=