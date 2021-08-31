'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const sqlite3_1 = __importDefault(require("sqlite3"));
sqlite3_1.default.verbose();
const db = new sqlite3_1.default.Database(':memory:');
const app_1 = __importDefault(require("../src/app"));
const app = app_1.default(db);
const schemas_1 = __importDefault(require("../src/schemas"));
describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }
            schemas_1.default(db);
            done();
        });
    });
    describe('GET /health', () => {
        it('should return health', (done) => {
            supertest_1.default(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0cy9hcGkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7O0FBRWIsMERBQWdDO0FBRWhDLHNEQUE2QjtBQUM3QixpQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLE1BQU0sRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFNUMscURBQWdDO0FBQ2hDLE1BQU0sR0FBRyxHQUFHLGFBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2Qiw2REFBMEM7QUFFMUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDdkIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7WUFFRCxpQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWpCLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ3pCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hDLG1CQUFPLENBQUMsR0FBRyxDQUFDO2lCQUNQLEdBQUcsQ0FBQyxTQUFTLENBQUM7aUJBQ2QsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7aUJBQzlCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcnRlc3QnO1xuXG5pbXBvcnQgc3FsaXRlMyBmcm9tICdzcWxpdGUzJ1xuc3FsaXRlMy52ZXJib3NlKCk7XG5jb25zdCBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlKCc6bWVtb3J5OicpO1xuXG5pbXBvcnQgc2VydmVyIGZyb20gJy4uL3NyYy9hcHAnO1xuY29uc3QgYXBwID0gc2VydmVyKGRiKTtcbmltcG9ydCBidWlsZFNjaGVtYXMgZnJvbSAnLi4vc3JjL3NjaGVtYXMnO1xuXG5kZXNjcmliZSgnQVBJIHRlc3RzJywgKCkgPT4ge1xuICAgIGJlZm9yZSgoZG9uZSkgPT4ge1xuICAgICAgICBkYi5zZXJpYWxpemUoKGVycikgPT4geyBcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidWlsZFNjaGVtYXMoZGIpO1xuXG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0dFVCAvaGVhbHRoJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBoZWFsdGgnLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2hlYWx0aCcpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgnQ29udGVudC1UeXBlJywgL3RleHQvKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXX0=