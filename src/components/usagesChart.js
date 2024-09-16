'use client'
import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import useFetchUsages from '../hooks/useFetchUsages'

const UsagesChart = () => {
  const { usages, loading, error } = useFetchUsages()
  const svgRef = useRef(null)

  useEffect(() => {
    if (loading || error) return;

    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 120, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous chart
    svg.selectAll('*').remove()

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Set scales
    const x = d3.scaleBand()
      .domain(usages.map(d => d.key))
      .range([0, chartWidth])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(usages, d => d.doc_count)])
      .nice()
      .range([chartHeight, 0])

    // Create bars
    g.selectAll('.bar')
      .data(usages)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.key))
      .attr('y', d => y(d.doc_count))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.doc_count))
      .attr('fill', 'steelblue')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'orange');
        tooltip.transition().duration(200).style('opacity', .9);
        tooltip.html(`${d.key}<br/>Count: ${d.doc_count}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`)
      })
      .on('mouseout', function(d) {
        d3.select(this).attr('fill', 'steelblue');
        tooltip.transition().duration(500).style('opacity', 0)
      });

    // Add x-axis
    g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${chartHeight})`)
    .call(d3.axisBottom(x))
    .selectAll('text')  // Selecciona todas las etiquetas de texto del eje
    .attr('transform', 'rotate(-45)')  // Gira los textos 45 grados (puedes cambiar el ángulo si lo deseas)
    .style('text-anchor', 'end')  // Ajusta la alineación para que el texto se vea bien
    .attr('dx', '-0.8em')  // Ajusta la posición horizontal
    .attr('dy', '0.15em'); // Ajusta la posición vertical

    // Add y-axis
    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('opacity', 0);
  }, [usages, loading, error])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <svg ref={svgRef} width={800} height={400}></svg>
    </div>
  )
}

export default UsagesChart

