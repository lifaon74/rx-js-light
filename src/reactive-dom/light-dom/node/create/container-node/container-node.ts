import { uuid } from '../../../../../misc/helpers/uuid';
import { onNodeAttachedListener } from '../../move/node/with-event/attach-node-with-event';
import { detachNodeWithEvent, onNodeDetachedListener } from '../../move/node/with-event/detach-node-with-event';
import { nodeInsertBefore } from '../../move/devired/dom-like/node/node-insert-before';
import { attachNode } from '../../move/node/attach-node';
import { detachNode } from '../../move/node/detach-node';
import { attachDocumentFragmentWithAttachEvent } from '../../move/node/with-event/bulk/fragment/attach-document-fragment-with-event';
import { moveNodeWithEvent } from '../../move/node/with-event/move-node-with-event';

type IContainerNodeBoundary = Text | Comment;

export class ContainerNode extends Comment {

  protected _startNode: IContainerNodeBoundary;
  protected _endNode: IContainerNodeBoundary;
  protected _fragment: DocumentFragment;

  constructor(
    name: string = `CONTAINER - ${ uuid() }`,
    transparent: boolean = false,
  ) {
    super(name);
    const startNode: IContainerNodeBoundary = transparent ? new Text() : new Comment(`START - ${ name }`);
    const endNode: IContainerNodeBoundary = transparent ? new Text() : new Comment(`END - ${ name }`);
    const fragment: DocumentFragment = new DocumentFragment();

    this._startNode = startNode;
    this._endNode = endNode;
    this._fragment = fragment;

    onNodeAttachedListener(this)((move: boolean) => {
      const parentNode: Node = this.parentNode as Node;
      if (move) {
        let node: ChildNode = endNode.previousSibling as ChildNode;
        attachNode(endNode, parentNode, this.nextSibling);
        while (node !== startNode) {
          const previousSibling: ChildNode = node.previousSibling as ChildNode;
          moveNodeWithEvent(node, parentNode, this.nextSibling);
          node = previousSibling;
        }
        attachNode(startNode, parentNode, this.nextSibling);
      } else {
        attachNode(endNode, parentNode, this.nextSibling);
        attachNode(startNode, parentNode, endNode);
        attachDocumentFragmentWithAttachEvent(fragment, parentNode, endNode); // fragment becomes empty
      }
    });

    onNodeDetachedListener(this)((move: boolean) => {
      if (!move) {
        let node: ChildNode = startNode.nextSibling as ChildNode;
        while (node !== endNode) {
          const nextSibling: ChildNode = node.nextSibling as ChildNode;
          detachNodeWithEvent(node);
          attachNode(node, fragment, null);
          node = nextSibling;
        }
        detachNode(startNode);
        detachNode(endNode);
      }
    });
  }

  get firstChild(): ChildNode | null {
    if (this.parentNode === null) {
      return this._fragment.firstChild;
    } else {
      const node: ChildNode | null = this._startNode.nextSibling;
      return (node === this._endNode)
        ? null
        : node;
    }
  }

  get lastChild(): ChildNode | null {
    if (this.parentNode === null) {
      return this._fragment.lastChild;
    } else {
      const node: ChildNode | null = this._endNode.previousSibling;
      return (node === this._startNode)
        ? null
        : node;
    }
  }

  getChildren(): Node[] {
    const children: Node[] = [];
    if (this.parentNode === null) {
      let node: Node | null = this._fragment.firstChild;
      while (node !== null) {
        children.push(node);
        node = node.nextSibling;
      }
    } else {
      let node: Node = this._startNode.nextSibling as Node;
      while (node !== this._endNode) {
        children.push(node);
        node = node.nextSibling as Node;
      }
    }
    return children;
  }

  insertBefore<GNewChild extends Node>(
    newChild: GNewChild,
    refChild: Node | null,
  ): GNewChild {
    if (this.parentNode === null) {
      // return nodeInsertBefore<GNewChild>(this._fragment, newChild, refChild);
      return this._fragment.insertBefore<GNewChild>(newChild, refChild);
    } else {
      // return nodeInsertBefore<GNewChild>(
      //   this.parentNode,
      //   newChild,
      //   (refChild === null)
      //     ? this._endNode
      //     : refChild
      // );
      return this.parentNode.insertBefore<GNewChild>(
        newChild,
        (refChild === null)
          ? this._endNode
          : refChild
      );
    }
  }
}

// TODO
// export function createContainerNode() {
//
// }

