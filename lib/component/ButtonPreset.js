import EventDispatcher from '../core/event/EventDispatcher';
import ObjectComponentNotifier from '../core/ObjectComponentNotifier';
import Event_ from '../core/event/Event';
import OptionEvent from '../core/OptionEvent';
import NodeEvent from '../core/document/NodeEvent';
import Node from '../core/document/Node';
import CSS from '../core/document/CSS';

function ButtonPreset(parentNode) {
    EventDispatcher.apply(this);
    var node    = this._btnNode = new Node(Node.INPUT_BUTTON),
        imgNode = this._indiNode = new Node();

    this._onActive = function () {};
    this._onDeactive = function () {};
    this._isActive = false;

    node.setStyleClass(CSS.ButtonPreset);
    node.addEventListener(NodeEvent.MOUSE_DOWN, this._onMouseDown.bind(this));

    node.addChild(imgNode);
    parentNode.addChildAt(node, 0);

    ObjectComponentNotifier.get().addEventListener(OptionEvent.TRIGGER, this, 'onOptionTrigger');
    this.addEventListener(OptionEvent.TRIGGERED, ObjectComponentNotifier.get(), 'onOptionTriggered');
}
ButtonPreset.prototype = Object.create(EventDispatcher.prototype);
ButtonPreset.prototype.constructor = ButtonPreset;

ButtonPreset.prototype.onOptionTrigger = function(e){
    if(e.data.origin == this){
        if(!this._isActive){
            this._onActive();
            this._btnNode.setStyleClass(CSS.ButtonPresetActive);
            this._isActive = true;
        } else{
            this._onDeactive();
        }
        return;
    }

    if(this._isActive){
        this.deactivate();
    }
};

ButtonPreset.prototype._onMouseDown = function(){
    this.dispatchEvent(new Event_(this, OptionEvent.TRIGGERED, null));
};

ButtonPreset.prototype.setOnActive = function(func){
    this._onActive = func;
};

ButtonPreset.prototype.setOnDeactive = function(func){
    this._onDeactive = func;
};

ButtonPreset.prototype.deactivate = function(){
    this._isActive = false;
    this._btnNode.setStyleClass(CSS.ButtonPreset);
};

export default ButtonPreset;
