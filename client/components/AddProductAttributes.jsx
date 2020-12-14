import React from 'react';

const AddProductAttributes = (props) => (
  <div>
    <div className="attr">
      <label>Size</label>
      <select name="size" id="size">
        <option value="small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
    </div>
    <div className="attr-group">
      <div className="attr">
        <label>Width</label>
        <div className="input-group">
          <input type="text" name="width" placeholder="10" id="width" />
          <div className="input-group-append">
            <span className="input-group-text">inches</span>
          </div>
        </div>
      </div>
      <div className="attr">
        <label>Height</label>
        <div className="input-group">
          <input type="text" name="height" placeholder="10" id="height" />
          <div className="input-group-append">
            <span className="input-group-text">inches</span>
          </div>
        </div>
      </div>
      <div className="attr">
        <label>Length</label>
        <div className="input-group">
          <input type="text" name="length" placeholder="10" id="length" />
          <div className="input-group-append">
            <span className="input-group-text">inches</span>
          </div>
        </div>
      </div>
    </div>
    <div className="attr">
      <label>Purchase Price ($)</label>
      <input
        type="number"
        min="0"
        name="purchasePrice"
        step="0.00"
        id="purchasePrice"
      />
    </div>
    <div className="attr">
      <label>Quantity</label>
      <input type="number" min="0" name="qty" id="qty" />
    </div>
  </div>
);

export default AddProductAttributes;
