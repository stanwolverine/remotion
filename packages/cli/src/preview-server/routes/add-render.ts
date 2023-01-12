import {makeCancelSignal} from '@remotion/renderer';
import type {ApiHandler} from '../api-types';
import type {AddRenderRequest} from '../render-queue/job';
import {addJob} from '../render-queue/queue';

export const handleAddRender: ApiHandler<AddRenderRequest, undefined> = ({
	input,
	entryPoint,
	remotionRoot,
}): Promise<undefined> => {
	const id = String(Math.random()).replace('0.', '');

	if (input.type === 'video') {
		addJob({
			entryPoint,
			remotionRoot,
			job: {
				cleanup: [],
				codec: input.codec,
				compositionId: input.compositionId,
				deletedOutputLocation: false,
				type: 'video',
				status: 'idle',
				id,
				imageFormat: input.imageFormat,
				outName: input.outName,
				quality: input.quality,
				scale: input.scale,
				startedAt: Date.now(),
				verbose: input.verbose,
				cancelToken: makeCancelSignal(),
			},
		});
	}

	if (input.type === 'still') {
		addJob({
			job: {
				compositionId: input.compositionId,
				id: String(Math.random()).replace('0.', ''),
				startedAt: Date.now(),
				type: 'still',
				outName: input.outName,
				status: 'idle',
				imageFormat: input.imageFormat,
				quality: input.quality,
				frame: input.frame,
				scale: input.scale,
				cleanup: [],
				deletedOutputLocation: false,
				verbose: input.verbose,
				cancelToken: makeCancelSignal(),
			},
			entryPoint,
			remotionRoot,
		});
	}

	return Promise.resolve(undefined);
};