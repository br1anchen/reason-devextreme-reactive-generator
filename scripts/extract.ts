// import Env from './env';
// const ReactivePath = Env.ReactivePath;

// import { kebabCase } from 'lodash';
// @ts-ignore
import * as reactDocgen from 'react-docgen';

import findComponents from './find-components';
import { readFileSync, existsSync } from 'fs';

const components = findComponents();
Object.keys(components).forEach(key => {
    components[key].forEach(componentPath => {
        let src = '';
        ['.js', '.jsx'].forEach(ext => {
            if (existsSync(componentPath + ext)) {
                src = readFileSync(componentPath + ext, 'utf8');
            }
        });
        if (!src) {
            return;
        }
        let reactAPI;
        try {
            reactAPI = reactDocgen.parse(src);
        } catch (err) {
            console.log('Error parsing src for', componentPath);
        }
        console.log(reactAPI);
    });
});
// const outputDirectory = path.join(__dirname, '../', 'output', 'json');

// components.forEach(componentPath => {
//     const src = readFileSync(componentPath, 'utf8');
//
//     if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
//         return;
//     }
//
//     const component = require(componentPath);
//     const styles = {
//         classes: [],
//         name: null,
//     };
//
//     if (component.styles && component.default.options) {
//         // Collect the customization points of the `classes` property.
//         styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
//             className => !className.match(/^(@media|@keyframes)/),
//         );
//         styles.name = component.default.options.name;
//     }
//
//     let reactAPI;
//     try {
//         reactAPI = reactDocgen.parse(src);
//     } catch (err) {
//         console.log('Error parsing src for', componentPath);
//         throw err;
//     }
//
//     reactAPI.name = path.parse(componentPath).name;
//     reactAPI.styles = styles;
//     reactAPI.filename = componentPath.replace(rootDirectory, '');
//     reactAPI.importPath = `material-ui/${componentPath.replace(`${rootDirectory}/src/`, '').replace('.js', '')}`;
//
//     // Inheritance
//     const inheritedComponentRegexp = /\/\/ @inheritedComponent (.*)/;
//     const inheritedComponent = src.match(inheritedComponentRegexp);
//     const inheritsFrom = !inheritedComponent ? '' : inheritedComponent[1];
//     reactAPI.inheritsFrom = inheritsFrom;
//
//     if (typeof reactAPI.props.classes !== 'undefined') {
//         reactAPI.props.classes.flowType = {
//             "name": "classes",
//             "elements": reactAPI.styles.classes
//         };
//     }
//
//     ensureExists(outputDirectory, 0o744, err => {
//         if (err) {
//             console.log('Error creating directory', outputDirectory);
//             console.log(err);
//             return;
//         }
//
//         writeFileSync(path.resolve(outputDirectory, `${kebabCase(reactAPI.name)}.json`), JSON.stringify(reactAPI));
//
//         console.log('Extracted JSON for', componentPath);
//     });
// });

// ensureExists(outputDirectory, 0o744, err => {
//     if (err) {
//         console.log('Error creating directory', outputDirectory);
//         console.log(err);
//         return;
//     }
//
//     writeFileSync(path.resolve(outputDirectory, `colors.json`), JSON.stringify(colors));
//
//     console.log('Extracted JSON for Colors');
// });