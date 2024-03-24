---
tags:
    - 算法
    - 竞赛
title: 月赛练习
date: 2024-03-17
---


## A
打卡题,给两个0-9之间的数a和b,然后输出任意一个在0-9之间不等于a+b的数

O(1)即可,显然a+b无论如何都不能同时等于1和0(其他任选两个在0-9之间的数字即可)
```py
def solve():
    a,b=MII()
    x=a+b
    if x==1:
        print(0)
    else:
        print(1)
    return 0
```
利用我们刚刚发现的性质,这题其实可以改的唬人一点(随便想的题),比如:

给定k个在0-n之间的数字,然后输出最大化的数m,满足m<=n且m不等于k个数字任意组合的和

数据满足:$k<=15,n<=10^{15},log_2n>=k$

然后构造数据的时候尽量让$2^k$和$n$接近(差小于5),避免别人乱写过了

现在看上去就是个比较有意思的签到题了

口胡一下解法:

任意组合k,最多$2^{15}<50000$种情况,所以我们只需要从n开始倒序递减枚举$2^k+1$个值,查看是否是已有的组合的值,如果是则继续递减,否则直接输出即为m

这样最坏的m也是$n-2^k$,所以无论n有多大,实际上时间复杂度即为$O(2^k)$

检测是否组合存在的话哈希,平衡树啥的都行

或许k能开的22(1e6)?不过没试过`unordered_set`这么大的冲突效率,还是不卡常,总不能让大家手写哈希作为签到吧,那就没有突出签到考察简单思维的意思了



## B
没什么好说的
```py
def solve():
    n=II()
    for _ in range(n):
        a=LII()
        for j in range(n):
            if a[j]==1:
                print(j+1,end=" ")
        print()
    return 0
```
## C
求一个小于等于N的最大回文数,并且该回文数是一个立方数,N小于等于1e18
题目第一眼看上去很吓人,又是求回文,又要是最大立方,数据范围还是$10^{18}$
但是仔细看看,立方,所以实际数据范围是$10^{6}$,这个数据暴力枚举判断回文即可
```py
def solve():
    def check(k):
        s=str(k*k*k)
        i,j=0,len(s)-1
        while i<j:
            if s[i]!=s[j]:
                return False
            i+=1
            j-=1
        return True
    n=II()
    for i in range(int(n**(1/3))+1,-1,-1):
        if check(i) and i*i*i<=n:
            print(i*i*i)
            break
    return 0
```
注意int(n**(1/3))+1要加1(不加1会WA)
## D
不知道为什么python给卡到RE

题意其实不是很好理解所谓的"Choose one leaf vertex v and delete it along with all incident edges"

按照通常的理解会在样例3WA掉,这个时候才能理解incident是有特殊方向的

我们要求的其实是从叶子节点开始删到只有一颗子树

顺带一提没想到`vector<vector<int>>`开邻接表会被卡
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=3e5+10;
vector<int> g[N];
int dfs(int root,int fa) {
    int ans=1;
    for (auto son: g[root]) {
        if (son!=fa) {
            ans+=dfs(son,root);
        }
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin>>n;
    for (int i = 1; i < n; i++) {
        int a,b;
        cin>>a>>b;
        g[a].push_back(b);
        g[b].push_back(a);
    }
    int s=0;
    int m=-1;
    for (auto son: g[1]) {
        int res=dfs(son,1);
        s+=res;
        m=max(m,res);
    }
    cout<<s-m+1<<endl;
    return 0;
}
```
## E
求状态1到状态n的最小消耗时间,对于一个状态$k(<=n)$,题目会给$A_k$的时间消耗到转态k+1,$B_k$的时间消耗到状态$x_k(<=n)$,求最小值


题目建图跑最短路即可
```cpp
def solve():
    n=II()
    g=[[] for _ in range(n+1)]
    for i in range(1,n):
        a,b,x=MII()
        g[i].append([i+1,a])
        g[i].append([x,b])
    n=len(g)
    src=1
    dist=[inf]*n
    dist[src]=0
    visited=[0]*n
    heap=[(0,src)]
    while heap:
        d,u=heappop(heap)
        if visited[u]:
            continue
        visited[u]=1
        for v,w in g[u]:
            dist[v]=min(dist[v],dist[u]+w)
            heappush(heap,(dist[v],v))
    print(dist[-1])
    return 0

```

## F
线段树优化dp?没写出来
## G
线段树维护次小值
