/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add('dd-gestures', function (Y, NAME) {


    /**
    * This module is the conditional loaded `dd` module to support gesture events
    * in the event that `dd` is loaded onto a device that support touch based events.
    *
    * This module is loaded and over rides 2 key methods on `DD.Drag` and `DD.DDM` to
    * attach the gesture events. Overrides `DD.Drag._prep` and `DD.DDM._setupListeners`
    * methods as well as set's the property `DD.Drag.START_EVENT` to `gesturemovestart`
    * to enable gesture movement instead of mouse based movement.
    * @module dd
    * @submodule dd-gestures
    */
    
    Y.DD.Drag.START_EVENT = 'gesturemovestart';

    Y.DD.Drag.prototype._prep = function() {
        this._dragThreshMet = false;
        var node = this.get('node'), DDM = Y.DD.DDM;

        node.addClass(DDM.CSS_PREFIX + '-draggable');

        node.on(Y.DD.Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this), {
            minDistance: 0,
            minTime: 0
        });

        node.on('gesturemoveend', Y.bind(this._handleMouseUp, this), { standAlone: true });
        node.on('dragstart', Y.bind(this._fixDragStart, this));

    };

    Y.DD.DDM._setupListeners = function() {
        var DDM = Y.DD.DDM;

        this._createPG();
        this._active = true;
        Y.one(Y.config.doc).on('gesturemove', Y.throttle(Y.bind(DDM._move, DDM), DDM.get('throttleTime')), { standAlone: true });
    };



}, '3.7.1pr1', {"requires": ["dd-drag", "event-synthetic", "event-gestures"]});