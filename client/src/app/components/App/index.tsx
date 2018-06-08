import { h } from 'hyperapp';

export default ({ count, down, up }) => (
  <div>
    <h2>{count}</h2>
    <wired-button onclick={() => down(1)}>-</wired-button>
    <wired-button onclick={() => up(1)}>+</wired-button>
  </div>
);
