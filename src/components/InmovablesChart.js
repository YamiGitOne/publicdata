'use client'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import useFetchInmovables from '../hooks/useFetchInmovables'

const InmovablesChart = () => {
  const { inmovables, loading, error } = useFetchInmovables()
  const svgRef = useRef(null)

  useEffect(() => {
    if (!loading && inmovables.length > 0) {
      const width = 400;
      const height = 400;
      const outerRadius = Math.min(width, height) / 2 - 10;
      const innerRadius = outerRadius * 0.75;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height]);

      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      const pie = d3.pie().sort(null).value((d) => d.doc_count);

      const arcs = pie(inmovables);

      svg.selectAll('path')
        .data(arcs)
        .join('path')
        .attr('fill', (d, i) => color(i))
        .attr('d', arc)
        .append('title') // Añadir tooltip
        .text(d => `${d.data.key}: ${d.data.doc_count}`);

      svg.selectAll('text')
        .data(arcs)
        .join('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(d => d.data.key);
    }
  }, [inmovables, loading]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && inmovables.length > 0 && (
        <svg ref={svgRef}></svg>
      )}
    </div>
  )
}

export default InmovablesChart
