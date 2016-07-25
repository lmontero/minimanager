/**
 * Created by Luis Montero on 7/22/2016.
 */
'use strict';
var assert = require('chai').assert;

/* Utils test cases */
require('./util/json.clone.spec')(assert);
require('./util/parse.date.spec')(assert);
require('./util/parse.to.json.spec')(assert);

/* Database test cases */
require('./database/component.module.spec')(assert);
require('./database/employee.module.spec')(assert);
require('./database/person.module.spec')(assert);
require('./database/room.module.spec')(assert);
require('./database/schedule.module.spec')(assert);
require('./database/team.module.spec')(assert);
require('./database/team-member.module.spec')(assert);

/* Resource test case */
require('./resources/component.resource.spec')(assert);
require('./resources/employee.resource.spec')(assert);
require('./resources/member.resource.spec')(assert);
require('./resources/person.resource.spec')(assert);
require('./resources/room.resource.spec')(assert);
require('./resources/schedule.resource.spec')(assert);
require('./resources/team.resource.spec')(assert);

/**
 * mocha --reporter nyan
 * istanbul cover node_modules/mocha/bin/_mocha -R
 */