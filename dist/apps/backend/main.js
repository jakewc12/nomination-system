/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const users_module_1 = __webpack_require__(7);
const applications_module_1 = __webpack_require__(14);
const nominations_module_1 = __webpack_require__(19);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, applications_module_1.ApplicationsModule, nominations_module_1.NominationsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_controller_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(9);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(9);
const create_user_request_dto_1 = __webpack_require__(12);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUser() {
        return this.usersService.getUsers();
    }
    createUser(request) {
        return this.usersService.createUser(request);
    }
};
exports.UsersController = UsersController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_user_request_dto_1.CreateUserRequestDto !== "undefined" && create_user_request_dto_1.CreateUserRequestDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('/users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = tslib_1.__importDefault(__webpack_require__(10));
let UsersService = class UsersService {
    async getUsers() {
        const { data, error } = await client_1.default.from('users').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async createUser(userColumns) {
        const { error } = await client_1.default.from('users').insert(userColumns);
        if (error) {
            throw new Error(error.message);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const supabase_js_1 = __webpack_require__(11);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports["default"] = supabase;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserRequestDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(13);
class CreateUserRequestDto {
}
exports.CreateUserRequestDto = CreateUserRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "lastName", void 0);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const applications_controller_1 = __webpack_require__(15);
const applications_service_1 = __webpack_require__(16);
let ApplicationsModule = class ApplicationsModule {
};
exports.ApplicationsModule = ApplicationsModule;
exports.ApplicationsModule = ApplicationsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [applications_controller_1.ApplicationsController],
        providers: [applications_service_1.ApplicationsService],
    })
], ApplicationsModule);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const applications_service_1 = __webpack_require__(16);
const create_application_request_dto_1 = __webpack_require__(17);
const update_application_request_dto_1 = __webpack_require__(18);
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    getApplications() {
        return this.applicationsService.getApplications();
    }
    getNominationForms() {
        return this.applicationsService.getNominationForms();
    }
    createApplication(request) {
        console.log(request);
        return this.applicationsService.createApplication(request);
    }
    updateApplication(id, request) {
        return this.applicationsService.updateApplication({
            id,
            ...request,
        });
    }
};
exports.ApplicationsController = ApplicationsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getApplications", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nomination-forms'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getNominationForms", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_application_request_dto_1.CreateApplicationRequestDto !== "undefined" && create_application_request_dto_1.CreateApplicationRequestDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApplicationsController.prototype, "createApplication", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_c = typeof update_application_request_dto_1.UpdateApplicationRequestDto !== "undefined" && update_application_request_dto_1.UpdateApplicationRequestDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApplicationsController.prototype, "updateApplication", null);
exports.ApplicationsController = ApplicationsController = tslib_1.__decorate([
    (0, common_1.Controller)('/applications'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof applications_service_1.ApplicationsService !== "undefined" && applications_service_1.ApplicationsService) === "function" ? _a : Object])
], ApplicationsController);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApplicationsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = tslib_1.__importDefault(__webpack_require__(10));
const class_validator_1 = __webpack_require__(13);
let ApplicationsService = class ApplicationsService {
    async getApplications() {
        const { data, error } = await client_1.default.from('applications').select('*');
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch applications: ${error.message}`);
        }
        return data;
    }
    async getNominationForms() {
        const { data: nominees, error: nomineesError } = await client_1.default
            .from('applications')
            .select('fullName, email');
        const { data: constituencies, error: constituencyError } = await client_1.default
            .from('applications')
            .select('constituency');
        if (nomineesError || constituencyError) {
            throw new common_1.InternalServerErrorException([
                nomineesError ? `Nominee data fetch failed: ${nomineesError.message}` : '',
                constituencyError ? `Constituency data fetch failed: ${constituencyError.message}` : '',
            ].filter(Boolean).join(' | '));
        }
        return {
            nominees: nominees,
            constituencies: [
                ...new Set(constituencies.map((item) => item.constituency)),
            ],
        };
    }
    async createApplication(applicationColumns) {
        try {
            await (0, class_validator_1.validateOrReject)(applicationColumns);
            console.log('columns', applicationColumns);
        }
        catch (errors) {
            throw new common_1.BadRequestException(this.formatValidationErrors(errors));
        }
        const { error } = await client_1.default
            .from('applications')
            .insert(applicationColumns);
        if (error) {
            throw new common_1.BadRequestException(`Failed to create application: ${error.message}`);
        }
    }
    formatValidationErrors(errors) {
        return errors
            .map((err) => `${err.property}: ${Object.values(err.constraints).join(', ')}`)
            .join('; ');
    }
    async updateApplication({ id, ...applicationColumns }) {
        const { data: applicationData } = await client_1.default
            .from('applications')
            .select('*')
            .eq('id', id);
        if (applicationData.length === 0) {
            throw new common_1.NotFoundException(`Application with given id, ${id}, does not exist.`);
        }
        const { error } = await client_1.default
            .from('applications')
            .update(applicationColumns)
            .eq('id', id);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to update application: ${error.message}`);
        }
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ApplicationsService);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateApplicationRequestDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(13);
class CreateApplicationRequestDto {
}
exports.CreateApplicationRequestDto = CreateApplicationRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a full name.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for full name.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for preferred full name.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "preferredFullName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for phonetic pronunciation.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "phoneticPronunciation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for nickname.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input an NUID.' }),
    (0, class_validator_1.Matches)(/^\d{9}$/, { message: 'An NUID must be exactly 9 digits long' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "nuid", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for pronouns.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "pronouns", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid northeastern email address.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+?\d{10,15}$/, { message: 'Phone number must be between 10 and 15 digits, optionally starting with "+".' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1, { message: 'Year must be between 1 and 5. The inputted year is less than 1' }),
    (0, class_validator_1.Max)(5, { message: 'Year must be between 1 and 5. The inputted year is more than 5' }),
    tslib_1.__metadata("design:type", Number)
], CreateApplicationRequestDto.prototype, "year", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a college name.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for college name.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "college", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a major.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for your major.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "major", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for your minor.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "minors", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input constituency.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for constituency.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "constituency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input constituencyName.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for constituencyName.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "constituencyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input selectedConstituencyType.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for selectedConstituencyType.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "selectedConstituencyType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input selectedReturningType.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for selectedReturningType.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "selectedReturningType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input selectedAttestation.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for selectedAttestation.' }),
    tslib_1.__metadata("design:type", String)
], CreateApplicationRequestDto.prototype, "selectedAttestation", void 0);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateApplicationRequestDto = void 0;
const create_application_request_dto_1 = __webpack_require__(17);
class UpdateApplicationRequestDto extends create_application_request_dto_1.CreateApplicationRequestDto {
}
exports.UpdateApplicationRequestDto = UpdateApplicationRequestDto;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominationsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nominations_controller_1 = __webpack_require__(20);
const nominations_service_1 = __webpack_require__(21);
let NominationsModule = class NominationsModule {
};
exports.NominationsModule = NominationsModule;
exports.NominationsModule = NominationsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [nominations_controller_1.NominationsController],
        providers: [nominations_service_1.NominationsService],
    })
], NominationsModule);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominationsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nominations_service_1 = __webpack_require__(21);
const create_nomination_request_dto_1 = __webpack_require__(23);
const update_nomination_request_dto_1 = __webpack_require__(24);
let NominationsController = class NominationsController {
    constructor(nominationsService) {
        this.nominationsService = nominationsService;
    }
    getNominations() {
        return this.nominationsService.getNominations();
    }
    async getNominationsByNuid(nuid) {
        console.log('nuid' + nuid);
        const result = await this.nominationsService.getNominationsByNuid(nuid);
        console.log('result', result);
        return result;
    }
    async getNominationsByName(name) {
        console.log('name', name);
        return this.nominationsService.getNominationsByName(name);
    }
    // TODO change this endpoint to getNominationsById instead of email
    ngetNominationsByEmail(email) {
        console.log('email' + email);
        return this.nominationsService.getNominationsByEmail(email);
    }
    createNomination(request) {
        return this.nominationsService.createNomination(request);
    }
    updateNomination(id, request) {
        return this.nominationsService.updateNomination({
            id,
            ...request,
        });
    }
    // Controller Method
    getUniqueNominees() {
        return this.nominationsService.getUniqueNominees();
    }
};
exports.NominationsController = NominationsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NominationsController.prototype, "getNominations", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nuid/:nuid'),
    tslib_1.__param(0, (0, common_1.Param)('nuid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NominationsController.prototype, "getNominationsByNuid", null);
tslib_1.__decorate([
    (0, common_1.Get)('/name/:name'),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NominationsController.prototype, "getNominationsByName", null);
tslib_1.__decorate([
    (0, common_1.Get)('/email/:email'),
    tslib_1.__param(0, (0, common_1.Param)('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], NominationsController.prototype, "ngetNominationsByEmail", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_nomination_request_dto_1.CreateNominationRequestDto !== "undefined" && create_nomination_request_dto_1.CreateNominationRequestDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NominationsController.prototype, "createNomination", null);
tslib_1.__decorate([
    (0, common_1.Put)('/id/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_c = typeof update_nomination_request_dto_1.UpdateNominationRequestDto !== "undefined" && update_nomination_request_dto_1.UpdateNominationRequestDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NominationsController.prototype, "updateNomination", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:unique-nominees'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NominationsController.prototype, "getUniqueNominees", null);
exports.NominationsController = NominationsController = tslib_1.__decorate([
    (0, common_1.Controller)('/nominations'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nominations_service_1.NominationsService !== "undefined" && nominations_service_1.NominationsService) === "function" ? _a : Object])
], NominationsController);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominationsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = tslib_1.__importDefault(__webpack_require__(10));
const nominations_types_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(13);
let NominationsService = class NominationsService {
    async getNominations() {
        const { data, error } = await client_1.default.from('nominations').select('*');
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch nominations: ${error.message}`);
        }
        return data;
    }
    async getNominationsByName(name) {
        console.log('name:' + name);
        const { count, error } = await client_1.default
            .from('nominations')
            .select('*', { count: 'exact' })
            .eq('nominee', name)
            .eq('status', nominations_types_1.Status.APPROVED);
        console.log('count', count);
        console.log('error', error);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch nominations for ${name}: ${error.message}`);
        }
        return count;
    }
    async getNameByNuid(nuid) {
        const { data, error } = await client_1.default
            .from('applications')
            .select('fullName')
            .eq('nuid', nuid)
            .single();
        console.log('error', error);
        if (error || !data) {
            throw new common_1.NotFoundException(`No application found for NUID ${nuid}`);
        }
        return data.fullName;
    }
    async getNominationsByNuid(nuid) {
        console.log('nuid' + nuid);
        const name = await this.getNameByNuid(nuid);
        const count = await this.getNominationsByName(name);
        console.log('final count', count);
        return count;
    }
    async getNominationsByEmail(email) {
        const { data, error } = await client_1.default
            .from('nominations')
            .select('*')
            .eq('email', email);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to fetch nominations: ${error.message}`);
        }
        if (data.length === 0) {
            throw new common_1.BadRequestException(`Nominations with given email, ${email}, do not exist.`);
        }
        return data;
    }
    async createNomination({ ...nominationsColumns }) {
        try {
            console.log('here');
            await (0, class_validator_1.validateOrReject)(nominationsColumns);
        }
        catch (errors) {
            console.log(errors);
            throw new common_1.BadRequestException(this.formatValidationErrors(errors));
        }
        if (nominationsColumns.fullName === nominationsColumns.nominee) {
            throw new common_1.BadRequestException('You cannot nominate yourself for Senator.');
        }
        // **Constituency Validation**: New helper function call
        await this.validateConstituency(nominationsColumns.nominee, nominationsColumns.constituency);
        console.log('hereee');
        let status = nominations_types_1.Status.APPROVED;
        const { data: nominationData } = await client_1.default
            .from('nominations')
            .select('*')
            .eq('email', nominationsColumns.email);
        // Has this nominator already nominated this nominee?
        const valid = nominationData.every((nomination) => nomination.nominee !== nominationsColumns.nominee);
        if (!valid) {
            status = nominations_types_1.Status.DENIED;
            console.log('what');
            throw new common_1.BadRequestException(`This nominator has already nominated the nominee: ${nominationsColumns.nominee}.`);
        }
        const { error } = await client_1.default.from('nominations').insert({
            ...nominationsColumns,
            status,
        });
        if (error) {
            throw new common_1.BadRequestException(`Failed to create nomination: ${error.message}`);
        }
    }
    async validateConstituency(nominee, constituency) {
        const { data: nomineeData, error: nomineeError } = await client_1.default
            .from('applications') // this is the name of the table right??
            .select('constituencyName')
            .eq('fullName', nominee)
            .single();
        if (nomineeError || !nomineeData) {
            console.log('error', nomineeError);
            throw new common_1.NotFoundException(`Nominee ${nominee} not found.`);
        }
        console.log(nomineeData);
        if (nomineeData.constituencyName !== constituency) {
            console.log(nomineeData.constituencyName);
            console.log(constituency);
            console.log((nomineeData.constituencyName !== constituency));
            throw new common_1.BadRequestException(`The nominator must belong to the same constituency as the nominee.`);
        }
    }
    formatValidationErrors(errors) {
        return errors
            .map((err) => `${err.property}: ${Object.values(err.constraints).join(', ')}`)
            .join('; ');
    }
    async updateNomination({ id, ...nominationColumns }) {
        const { data: nominationData } = await client_1.default
            .from('nominations')
            .select('*')
            .eq('id', id);
        if (nominationData.length === 0) {
            throw new common_1.NotFoundException(`Nominations with given id, ${id}, does not exist.`);
        }
        const { error } = await client_1.default
            .from('nominations')
            .update({
            ...nominationColumns,
        })
            .eq('id', id);
        if (error) {
            throw new common_1.InternalServerErrorException(`Failed to update nomination: ${error.message}`);
        }
    }
    async getUniqueNominees() {
        const { data: applicants, error } = await client_1.default
            .from('applications')
            .select('id, fullName')
            .order('id', { ascending: false });
        if (error) {
            throw new common_1.InternalServerErrorException('Error fetching nominees: ' + error.message);
        }
        const uniqueNominees = new Map();
        for (const applicant of applicants) {
            if (!uniqueNominees.has(applicant.fullName)) {
                uniqueNominees.set(applicant.fullName, applicant);
            }
        }
        return Array.from(uniqueNominees.values()).map((applicant) => applicant.fullName);
    }
};
exports.NominationsService = NominationsService;
exports.NominationsService = NominationsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], NominationsService);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Status = void 0;
var Status;
(function (Status) {
    Status["APPROVED"] = "APPROVED";
    Status["DENIED"] = "DENIED";
    Status["MANUAL_REVIEW"] = "MANUAL_REVIEW";
})(Status || (exports.Status = Status = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNominationRequestDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(13);
class CreateNominationRequestDto {
}
exports.CreateNominationRequestDto = CreateNominationRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a full name.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for full name.' }),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address.' }),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "nominee", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input constituency.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for constituency.' }),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "constituency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a college name.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for college name.' }),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "college", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input a major.' }),
    (0, class_validator_1.IsString)({ message: 'Please enter a valid string for your major.' }),
    tslib_1.__metadata("design:type", String)
], CreateNominationRequestDto.prototype, "major", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'You must input graduation year.' }),
    (0, class_validator_1.IsPositive)({ message: 'Please enter a valid positive integer for graduation year.' }),
    tslib_1.__metadata("design:type", Number)
], CreateNominationRequestDto.prototype, "graduationYear", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateNominationRequestDto.prototype, "receiveSenatorInfo", void 0);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateNominationRequestDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(13);
const create_nomination_request_dto_1 = __webpack_require__(23);
const nominations_types_1 = __webpack_require__(22);
class UpdateNominationRequestDto extends create_nomination_request_dto_1.CreateNominationRequestDto {
}
exports.UpdateNominationRequestDto = UpdateNominationRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof nominations_types_1.Status !== "undefined" && nominations_types_1.Status) === "function" ? _a : Object)
], UpdateNominationRequestDto.prototype, "status", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const common_2 = __webpack_require__(1);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_2.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    const port = process.env.PORT || 10000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;