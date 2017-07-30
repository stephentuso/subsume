import test from 'ava';
import Subsume from './';

test('new Subsume()', t => {
	const subsume = new Subsume();
	t.is(typeof subsume.id, 'string');
	t.is(subsume.id.length, 32);
	t.true(subsume.prefix.startsWith('Qq-'));
	t.true(subsume.prefix.endsWith('-qQ'));
	t.true(subsume.postfix.startsWith('Zz-'));
	t.true(subsume.postfix.endsWith('-zZ'));
	t.truthy(subsume.regex);
});

test('new Subsume(id)', t => {
	const subsume = new Subsume('unicorn');
	t.is(subsume.id, 'unicorn');
	t.is(subsume.prefix, 'Qq-unicorn-qQ');
});

test('Subsume.parse()', t => {
	const fixture = 'someQq-7febcd0b3806fbc48c01d7cea4ed1219-qQ🦄Zz-7febcd0b3806fbc48c01d7cea4ed1219-zZ random text';
	const id = '7febcd0b3806fbc48c01d7cea4ed1219';

	t.deepEqual(Subsume.parse(fixture, id), {
		data: '🦄',
		rest: 'some random text'
	});
});

test('Subsume#compose()', t => {
	const subsume = new Subsume();
	const text = subsume.compose('🦄');
	t.true(text.includes('🦄'));
	t.is(Subsume.parse(text, subsume.id).data, '🦄');
});

test('Subsume#parse()', t => {
	const fixture = 'someQq-7febcd0b3806fbc48c01d7cea4ed1219-qQ🦄Zz-7febcd0b3806fbc48c01d7cea4ed1219-zZ random text';
	const subsume = new Subsume('7febcd0b3806fbc48c01d7cea4ed1219');

	t.deepEqual(subsume.parse(fixture), {
		data: '🦄',
		rest: 'some random text'
	});
});
