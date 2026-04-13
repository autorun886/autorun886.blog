---
title: VCG爬虫
permalink: /post/vcg-spider.html
categories: 网络爬虫
tags: 爬虫
date: 2025-09-30 20:42:28
---

# VCG爬虫

## 目标：www.vcg.com
## 第三方库：requests,lxml,pypinyin

好久没写爬虫了，练练手  

```python
import requests
from lxml import etree
import random
from pypinyin import lazy_pinyin

headers_list = (
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60",
    "Opera/8.0 (Windows NT 5.1; U; en)",
    "Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50",
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.133 Safari/534.16"
)

headers = {"User-Agent": random.choice(headers_list)}


def vcg(_input_, local=False, page=1, iptool={}):
    word = "".join(lazy_pinyin(_input_))
    url = f"https://www.vcg.com/creative-image/{word}/?page={page}"
    response = requests.get(url, headers=headers, timeout=10, proxies=iptool)

    html = etree.HTML(response.text)
    img_list = html.xpath('//div[@class="gallery_inner"]/figure/a/img/@data-src')
    img = [f"https://{i.split('//')[1]}" for i in img_list]

    if local:
        for img_url in img:
            file_name = img_url.split("/")[-1]
            response = requests.get(img_url, headers=headers, timeout=10, proxies=iptool)
            with open(f'./{file_name}', "wb") as f:
                f.write(response.content)
            print(f"{file_name} 下载完成")
    else:
        return img


vcg("星空", local=True)
```