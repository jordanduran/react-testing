/* eslint-disable testing-library/await-async-query */
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

// Set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/*
 * Factory function to create a shallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter display starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('clicking increment button increments counter display', () => {
  const wrapper = setup();

  // Find button
  const button = findByTestAttr(wrapper, 'increment-button');

  // Click button
  button.simulate('click');
  // Find display, and test that the count is being incremented
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('1');
});

test('clicking decrement button decrements counter display', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('counter does not go below zero', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});
