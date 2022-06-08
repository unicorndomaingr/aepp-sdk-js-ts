/**
 * NodePool module
 * @module @aeternity/aepp-sdk/es/node-pool
 * @export NodePool
 * @example import { NodePool } from '@aeternity/aepp-sdk'
 */
import stampit from '@stamp/it'
// @ts-expect-error TODO remove
import { getNetworkId } from '../node'
import { DisconnectedError, DuplicateNodeError, NodeNotFoundError } from '../utils/errors'
import { PROTOCOL_VM_ABI } from './../tx/builder/schema'

// TODO: Update me when node module is migrated to TS
type Node = any

interface NodeInfo {
  name: string
  version: string
  networkId: string
  consensusProtocolVersion: keyof typeof PROTOCOL_VM_ABI
}

interface NodePool {
  pool: Map<string, Node>
  addNode: (name: string, node: Node, select?: boolean) => void
  selectNode: (name: string) => void
  getNodeInfo: () => NodeInfo
  isNodeConnected: () => boolean
  getNetworkId: (node?: Node) => string
  getNodesInPool: () => NodeInfo[]
  selectedNode?: Node
  readonly api: Node['api']
}

export class _NodePool implements NodePool {
  readonly api: Node['api']
  pool: Map<string, Node>
  selectedNode?: Node

  init ({ nodes = [] }: { nodes: Node[] }): void {
    this.pool = new Map()
    nodes.forEach((node, i: number) => {
      const { name, instance } = node
      this.addNode(name, instance, i === 0)
    })

    if (nodes.length > 0) this.selectNode(nodes[0].name)

    // TODO: rewrite to TypeScript getter after dropping stamp
    Object.defineProperties(this, {
      api: {
        enumerable: true,
        configurable: false,
        get () {
          if (this.selectedNode?.instance == null) {
            throw new NodeNotFoundError('You can\'t use Node API. Node is not connected or not defined!')
          }
          return this.selectedNode.instance.api
        }
      }
    })
  }

  /**
   * Add Node
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @param name - Node name
   * @param node - Node instance
   * @param select - Select this node as current
   * @example
   * // add and select new node with name 'testNode'
   * nodePool.addNode('testNode', awaitNode({ url }), true)
   */
  addNode (name: string, node: Node, select = false): void {
    if (this.pool.has(name)) throw new DuplicateNodeError(name)

    this.pool.set(name, {
      name,
      instance: node,
      url: node.url,
      networkId: node.nodeNetworkId,
      version: node.version,
      consensusProtocolVersion: node.consensusProtocolVersion
    })
    if (select || this.selectedNode == null) {
      this.selectNode(name)
    }
  }

  /**
   * Select Node
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @param name - Node name
   * @example
   * nodePool.selectNode('testNode')
   */
  selectNode (name: string): void {
    if (!this.pool.has(name)) throw new NodeNotFoundError(`Node with name ${name} not in pool`)
    this.selectedNode = this.pool.get(name)
  }

  /**
   * Get NetworkId of current Node
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @example
   * nodePool.getNetworkId()
   */
  getNetworkId: (node?: any) => string = getNetworkId

  /**
   * Check if you have selected node
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @example
   * nodePool.isNodeConnected()
   */
  isNodeConnected (): boolean {
    return this.selectedNode.instance != null
  }

  /**
   * Get information about node
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @example
   * nodePool.getNodeInfo() // { name, version, networkId, protocol, ... }
   */
  getNodeInfo (): NodeInfo {
    if (!this.isNodeConnected()) throw new DisconnectedError()
    return {
      name: this.selectedNode.name,
      ...this.selectedNode.instance.getNodeInfo()
    }
  }

  /**
   * Get array of available nodes
   * @alias module:@aeternity/aepp-sdk/es/node-pool
   * @example
   * nodePool.getNodesInPool()
   */
  getNodesInPool (): NodeInfo[] {
    return Array.from(this.pool.entries()).map(([name, node]) => ({
      name,
      ...node.instance.getNodeInfo()
    }))
  }
}

/**
 * Node Pool Stamp
 * This stamp allow you to make basic manipulation (add, remove, select) on list of nodes
 * @alias module:@aeternity/aepp-sdk/es/node-pool
 * @param options - Initializer object
 * @param options.nodes - Array with Node instances
 * @return NodePool instance
 */
export default stampit<NodePool>({
  init: _NodePool.prototype.init,
  methods: {
    addNode: _NodePool.prototype.addNode,
    selectNode: _NodePool.prototype.selectNode,
    getNodeInfo: _NodePool.prototype.getNodeInfo,
    isNodeConnected: _NodePool.prototype.isNodeConnected,
    getNetworkId,
    getNodesInPool: _NodePool.prototype.getNodesInPool
  }
})
