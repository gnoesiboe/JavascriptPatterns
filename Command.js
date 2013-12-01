/**
 * Base command
 */

var Command = function (action, params) {
    this._action = null;
    this._params = null;

    Command.prototype._init.apply(this, arguments);
};

Command.prototype._init = function (action, params) {
    this._setAction(action);
    this._setParams(params);
};

Command.prototype._setParams = function (params) {
    this._params = params;
};

Command.prototype._setAction = function (action) {
    this._action = action;
};

Command.prototype.getAction = function () {
    return this._action;
};

Command.prototype.getParams = function () {
    return this._params;
}

/**
 * Child command
 */

var EatCakeCommand = function (params) {
    this._action = 'eat cacke';

    EatCakeCommand.prototype._init.apply(this, arguments);
};

EatCakeCommand.prototype = Object.create(Command.prototype);
EatCakeCommand.prototype.constructor = EatCakeCommand;

EatCakeCommand.prototype._init = function (params) {
    this._params = params;
};

/**
 * Person to handle command
 */

var Person = function () {
};

Person.prototype.execute = function (command) {
    this._validateCommand(command);

    console.log('execute command: ', command.getAction(), command.getParams());
};

Person.prototype._validateCommand = function (command) {
    if ((command instanceof Command) === false) {
        throw new Error('Command should be an instanceof Command');
    }
};

/**
 * Tests
 */

var myEatCakeCommand = new EatCakeCommand({
    eerste: 'eerste',
    tweede: 'tweede'
});

var mySecondEatCakeCommand = new EatCakeCommand({
    derde: 'derde',
    vierde: 'vierde'
});

var myPerson = new Person();
myPerson.execute(myEatCakeCommand);
myPerson.execute(mySecondEatCakeCommand);