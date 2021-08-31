'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const port = 8010;
const sqlite3_1 = __importDefault(require("sqlite3"));
sqlite3_1.default.verbose();
const db = new sqlite3_1.default.Database(':memory:');
const schemas_1 = __importDefault(require("./src/schemas"));
const logger_1 = __importDefault(require("./src/utils/logger"));
const app_1 = __importDefault(require("./src/app"));
db.serialize(() => {
    schemas_1.default(db);
    const app = app_1.default(db);
    app.listen(port, () => logger_1.default.info(`App started and listening on port ${port}`));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7O0FBRWIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLHNEQUE4QjtBQUM5QixpQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLE1BQU0sRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFNUMsNERBQXlDO0FBQ3pDLGdFQUF3QztBQUN4QyxvREFBa0M7QUFFbEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7SUFDZCxpQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpCLE1BQU0sR0FBRyxHQUFHLGFBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUxQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwb3J0ID0gODAxMDtcbmltcG9ydCBzcWxpdGUzIGZyb20gJ3NxbGl0ZTMnO1xuc3FsaXRlMy52ZXJib3NlKCk7XG5jb25zdCBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlKCc6bWVtb3J5OicpO1xuXG5pbXBvcnQgYnVpbGRTY2hlbWFzIGZyb20gJy4vc3JjL3NjaGVtYXMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL3NyYy91dGlscy9sb2dnZXInO1xuaW1wb3J0IGFwcE1vZHVsZSBmcm9tICcuL3NyYy9hcHAnO1xuXG5kYi5zZXJpYWxpemUoKCkgPT4ge1xuICAgIGJ1aWxkU2NoZW1hcyhkYik7XG5cbiAgICBjb25zdCBhcHAgPSBhcHBNb2R1bGUoZGIpO1xuXG4gICAgYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiBsb2dnZXIuaW5mbyhgQXBwIHN0YXJ0ZWQgYW5kIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH1gKSk7XG59KTsiXX0=