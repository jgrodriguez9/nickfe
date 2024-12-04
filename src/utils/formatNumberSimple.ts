const formatNumberSimple = (value:  number | null | undefined) => {

    const formatter = new Intl.NumberFormat('en-US');
      if (value) return formatter.format(value);
      return '0';
}

export { formatNumberSimple }