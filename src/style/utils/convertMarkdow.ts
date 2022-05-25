import { DOMElement } from "react";

export function markdown(src: String): any {

    var rx_lt = /</g;
    var rx_gt = />/g;
    var rx_space = /\t|\r|\uf8ff/g;
    var rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
    var rx_hr = /^([*\-=_] *){3,}$/gm;
    var rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
    var rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
    var rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
    var rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
    var rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g;
    var rx_link = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
    var rx_table = /\n(( *\|.*?\| *\n)+)/g;
    var rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
    var rx_row = /.*\n/g;
    var rx_cell = /\||(.*?[^\\])\|/g;
    var rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
    var rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
    var rx_stash = /-\d+\uf8ff/g;

    function replace(rex: RegExp, fn: any) {
        src = src.replace(rex, fn);
    }

    function element(tag: String, content: String) {
        return '<' + tag + '>' + content + '</' + tag + '>';
    }

    function blockquote(src: String): String {
        return src.replace(rx_blockquote, function(all, content) {
            return element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, ''))));
        });
    }

    function list(src: String): String {
        return src.replace(rx_list, function(all, ind, ol, num, low, content) {
            var entry = element('li', highlight(content.split(
                RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g')).map(list).join('</li><li>')));

            return '\n' + (ol
                ? '<ol start="' + (num
                    ? ol + '">'
                    : parseInt(ol,36) - 9 + '" style="list-style-type:' + (low ? 'low' : 'upp') + 'er-alpha">') + entry + '</ol>'
                : element('ul', entry));
        });
    }

    function highlight(src: String): String {
        return src.replace(rx_highlight, function(all, _, p1, emp, sub, sup, small, big, p2, content) {
            return _ + element(
                  emp ? (p2 ? 'strong' : 'em')
                : sub ? (p2 ? 's' : 'sub')
                : sup ? 'sup'
                : small ? 'small'
                : big ? 'big'
                : 'code',
                highlight(content));
        });
    }

    function unesc(str: String): String {
        return str.replace(rx_escape, '$1');
    }

    let stash: any[] = [];
    var si = 0;

    src = '\n' + src + '\n';

    replace(rx_lt, '&lt;');
    replace(rx_gt, '&gt;');
    replace(rx_space, '  ');

    // blockquote
    src = blockquote(src);

    // horizontal rule
    replace(rx_hr, '<hr/>');

    // list
    src = list(src);
    replace(rx_listjoin, '');

    // code
    replace(rx_code, function(all: String, p1: String, p2: String, p3: String, p4: String) {
        stash[--si] = element('pre', element('code', p3||p4.replace(/^    /gm, '')));
        return si + '\uf8ff';
    });

    // link or image
    replace(rx_link, function(all: String, p1: String, p2: String, p3: String, p4: String, p5: String, p6: String) {
        stash[--si] = p4
            ? p2
                ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
                : '<a href="' + p4 + '">' + unesc(highlight(p3)) + '</a>'
            : p6;
        return si + '\uf8ff';
    });

    // table
    replace(rx_table, function(all: String, table: any) {
        var sep = table.match(rx_thead)[1];
        return '\n' + element('table',
            table.replace(rx_row, function(row: String, ri: String) {
                return row == sep ? '' : element('tr', row.replace(rx_cell, function(all, cell, ci) {
                    return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
                }))
            })
        )
    });

    // heading
    replace(rx_heading, function(all: String, _: String, p1: String, p2: String) { return _ + element('h' + p1.length, unesc(highlight(p2))) });

    // paragraph
    replace(rx_para, function(all: String, content: String) { return element('p', unesc(highlight(content))) });

    // stash
    replace(rx_stash, function(all: string) { return stash[parseInt(all)] });

    return src;
};