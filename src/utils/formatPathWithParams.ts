const formatPathWithParams = (pathTemplate: string, id: string | number) =>
  pathTemplate.replace(':id', String(id));

export default formatPathWithParams;
