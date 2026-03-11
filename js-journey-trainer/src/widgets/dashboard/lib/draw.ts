import * as d3 from 'd3';
import { chartStore, createTooltip } from '../model/store';
// import createElement from '@/shared/lib/dom/create-element';
import type { ChartData } from '../model/types';

type ColorScale = d3.ScaleOrdinal<string, string, never>;
// type ColorScale = (i: number | string) => string;

export const createLegend = (data: ChartData[], colorScale: ColorScale, isVertical: boolean): HTMLElement => {

    const legend = document.createElement('div');
    legend.className = `legend ${isVertical ? 'vertical' : 'horizontal'}`;

    data.forEach((_, i) => {
        const d = data[i];
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
      <div class="color-box" style="background-color: ${colorScale(i.toString())}"></div>
      <span>${d.label}</span>
    `;
        legend.append(item);
    });

    return legend;
};

export const drawPieChart = (selector: string, data: ChartData[], colors: readonly string[] = d3.schemeAccent) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const tooltip = createTooltip();

    chartStore.set(selector, { data, colors: [...colors] });
    const isWide = selector === "#chart-1";
    const size = isWide ? 250 : 180;
    const radius = size / 2 - 10;

    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = `card-content ${isWide ? 'row' : 'column'}`;


    const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svg = d3.select(svgNode)
        .attr("width", size)
        .attr("height", size);

    const group = svg.append("g")
        .attr("transform", `translate(${size / 2}, ${size / 2})`);

    const pie = d3.pie<ChartData>().sort(null).value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<ChartData>>().innerRadius(size / 4).outerRadius(radius);
    const colorScale = d3.scaleOrdinal(colors);

    const path = group.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (_: d3.PieArcDatum<ChartData>, i: number) => colorScale(i.toString()))
        .attr('stroke', '#fff')
        .style('stroke-width', '2px')
        .on('mouseover', (_: MouseEvent, d: d3.PieArcDatum<ChartData>) => {
            tooltip.style.opacity = '1';
            tooltip.textContent = `${d.data.label}: ${d.data.value}`;
        })
        .on('mousemove', (e: MouseEvent) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 20 + 'px';
        })
        .on('mouseleave', () => tooltip.style.opacity = '0');

    path.style("opacity", 0)
        .transition()
        .delay((_: d3.PieArcDatum<ChartData>, index: number) => index * 500)
        .duration(2000)
        .ease(d3.easeBackOut)
        .style("opacity", 1)
        .attrTween('d', function (datum: d3.PieArcDatum<ChartData>) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, datum);
            return t => arc(interpolate(t)) || "";
        });

    wrapper.append(svg.node()!);
    wrapper.append(createLegend(data, colorScale, isWide));
    container.append(wrapper);
};

export const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const id = `#${entry.target.id}`;
        const state = chartStore.get(id);
        if (state) {
            drawPieChart(id, state.data, state.colors);
        }
    }
});