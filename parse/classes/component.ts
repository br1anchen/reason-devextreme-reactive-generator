import * as Hash from 'object-hash';
import ComponentFromJson from './../helpers/component-from-json';

import Property from './property';

class Component {
    // Statics
    static ignorePropNames = [ 'children' ];

    // ComponentSignature
    private _component: ComponentSignature;

    // Sections of the reason Component (properties can add to them as needed)
    private _sectionModule: { [hash: string]: string } = {};
    private _sectionMake: string[] = [];
    private _sectionMakeProps: string[] = [];
    private _sectionWrapJs: string[] = [];

    // Property List
    private _properties: Property[] = [];

    constructor(jsonString: string) {
        this._component = ComponentFromJson(jsonString);
        this.parse();
    }

    // Getters
    public get name() {
        return this._component.name || this._component.displayName;
    }

    public get properties() {
        return this._properties;
    }

    private getSectionByKey(section: string) {
        switch (section) {
            case 'Make':
                return this._sectionMake;
            case 'MakeProps':
                return this._sectionMakeProps;
            case 'WrapJs':
                return this._sectionWrapJs;
            default:
                return false;
        }
    }

    public addToSection(section: 'Module' | 'Make' | 'MakeProps' | 'WrapJs', content: string) {
        if (section === 'Module') {
            this._sectionModule[Hash(content)] = content;
        }
        else {
            const addTo = this.getSectionByKey(section);
            if (addTo) {
                addTo.push(content);
            }
        }
    }

    private renderSection(section: 'Module' | 'Make' | 'MakeProps' | 'WrapJs') {
        if (section === 'Module') {
            return Object.keys(this._sectionModule).map(key => this._sectionModule[key]).join('\n');
        }
        else {
            const renderFrom = this.getSectionByKey(section);
            if (renderFrom && renderFrom.length) {
                return renderFrom.join('\n');
            }
        }
        return '';
    }

    private parse() {
        if (this._component.props != null) {
            const propKeys = Object.keys(this._component.props);
            this._properties = propKeys.filter(
                propKey => Component.ignorePropNames.indexOf(propKey) === -1
            ).reduce(
                (arr, propKey) => this._component.props != null ? [ ...arr, new Property(propKey, this._component.props[propKey], this) ] : arr,
                []
            );
        }
    }

    public render() {
        const hasProps = this._component.props != null;

        return `
            module ${this.name} = {
                ${this.renderSection('Module')}
                ${hasProps ? `[@bs.obj] external makeProps : (${this.renderSection('MakeProps')} unit) => _ = "";` : ''}
                [@bs.module "${this._component.importPath}"] external reactClass : ReasonReact.reactClass = "${this._component.importName || 'default'}";
                let make = (
                    ${this.renderSection('Make')}
                    children
                ) => ReasonReact.wrapJsForReason(
                        ~reactClass,
                        ~props=${!hasProps ? 'Js.Obj.empty()' : `makeProps(${this.renderSection('WrapJs')} ())`},
                        children
                    );
            };
        `;
    }
}

export default Component;