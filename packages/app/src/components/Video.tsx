import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useEditor, useNode, UserComponent } from '@craftjs/core';

export type VideoProps = {
	src: string;
};

const Player = styled.div<{ enabled: boolean }>`
	width: 100%;
	height: 100%;

	> div {
		height: 100%;
	}

	iframe {
		pointer-events: ${(props) => (props.enabled ? 'none' : 'auto')};
	}
`;

export const Video: FunctionComponent<VideoProps> & UserComponent<VideoProps> = ({ src }) => {
	const { enabled } = useEditor((state) => ({
		enabled: state.options.enabled,
	}));

	const {
		connectors: { connect },
	} = useNode();

	return (
		<Player ref={(ref: HTMLDivElement) => connect(ref)} enabled={enabled}>
			<video src={src} controls={true} />
		</Player>
	);
};

const Settings = () => {
	return <></>;
};

Video.craft = {
	displayName: 'Video',
	props: {
		src: '',
	},
	related: {
		toolbar: Settings,
	},
};
