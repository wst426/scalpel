import * as d3 from "d3";

function main() {
  const app = document.getElementById('app');
  if (app === null) return;

  const btn = document.getElementById('confirm-btn');
  if (btn === null) return;

  btn.addEventListener('click', () => {
    const dirInput = document.getElementById('dir-input');
    if (dirInput === null || !(dirInput instanceof HTMLInputElement)) return;
    api.loadDir(dirInput.value);
  });

  api.handleData((event, data) => {
    app.innerHTML = '';

    const svg = d3
      .select('#app')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);
    const link = svg
      .selectAll('.link')
      .data(data.edges)
      .join('line')
      .style('stroke', 'black')
      .classed('link', true);
    const node = svg
      .selectAll('.node')
      .data(data.nodes)
      .join('circle')
      .attr('r', 5)
      .classed('node', true);

    const simulation = d3
      .forceSimulation()
      .nodes(data.nodes)
      .force('center', d3.forceCenter(250, 250))
      .force('link', d3.forceLink(data.edges))
      .on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);
        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);
      });

    simulation.restart();
  });
}

main();
