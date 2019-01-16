import requestAnimationFrame from './tempPolyfills';
 
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import Home from './containers/Home/Home';
import CharacterRedirect from './components/CharacterRedirect/CharacterRedirect';
import VotingPage from './containers/VotingPage/VotingPage';
import UploadPage from './containers/UploadPage/UploadPage';
import EliminationPage from './containers/EliminationPage/EliminationPage';
import FinalsPage from './containers/FinalsPage/FinalsPage';
import Winner from './containers/Winner/Winner';
import componentNotFound from './components/ComponentNotFound/ComponentNotFound';
import App from './App';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/rANdOmm' ]}>
      <App/>
    </MemoryRouter>
  );

    expect(wrapper.find(VotingPage)).toHaveLength(0);
    expect(wrapper.find(EliminationPage)).toHaveLength(0);
    expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
    expect(wrapper.find(FinalsPage)).toHaveLength(0);
    expect(wrapper.find(UploadPage)).toHaveLength(0);
    expect(wrapper.find(Winner)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(componentNotFound)).toHaveLength(1);
});

// TODO: Update router test suite to provide redux-connected components with a mock store


// test('`/voting-page` should direct to `VotingPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/voting-page' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(1);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/elimination-page` should direct to `EliminationPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/elimination-page' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(1);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/not-enough-characters` should direct to `CharacterRedirect` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/not-enough-characters' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(1);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/finals-page` should redirect to `FinalsPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/finals-page' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(1);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/upload-page` should redirect to `FinalsPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/upload-page' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(1);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/winner` should redirect to `FinalsPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/winner' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(1);
//     expect(wrapper.find(Home)).toHaveLength(0);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });

// test('`/` should redirect to `FinalsPage` component.', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/' ]}>
//       <App/>
//     </MemoryRouter>
//   );

//     expect(wrapper.find(VotingPage)).toHaveLength(0);
//     expect(wrapper.find(EliminationPage)).toHaveLength(0);
//     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
//     expect(wrapper.find(FinalsPage)).toHaveLength(0);
//     expect(wrapper.find(UploadPage)).toHaveLength(0);
//     expect(wrapper.find(Winner)).toHaveLength(0);
//     expect(wrapper.find(Home)).toHaveLength(1);
//     expect(wrapper.find(componentNotFound)).toHaveLength(0);
// });
