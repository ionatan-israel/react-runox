function ReactContent({ childs, selector }: any) {
    const [prop, value] = selector.split('=')
    return childs.filter((e: any) => e.props[prop] === value);
}

export default ReactContent;
