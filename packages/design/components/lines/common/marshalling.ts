

export const enum MarshalledId {
	Uri = 1,
	Regexp,
	ScmResource,
	ScmResourceGroup,
	ScmProvider,
	CommentController,
	CommentThread,
	CommentThreadReply,
	CommentNode,
	CommentThreadNode,
	TimelineActionContext,
	NotebookCellActionContext,
	TestItemContext,
}

export interface MarshalledObject {
	$mid: MarshalledId;
}
