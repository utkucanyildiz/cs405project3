/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // Get the transformation matrix for this node
        var nodeTransformation = this.trs.getTransformationMatrix();
        
        // Apply the node's transformation to all matrices
        var transformedModel = MatrixMult(modelMatrix, nodeTransformation);
        var transformedModelView = MatrixMult(modelView, nodeTransformation);
        var transformedMvp = MatrixMult(mvp, nodeTransformation);
        
        // Calculate normal matrix from the transformed modelView matrix
        var transformedNormals = getNormalMatrix(transformedModelView);

        // Draw the MeshDrawer if it exists
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Draw all children with the transformed matrices
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}