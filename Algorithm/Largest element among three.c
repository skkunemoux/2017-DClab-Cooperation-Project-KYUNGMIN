//Best way to get the largest element among three elements.

#include <stdio.h>

int max2(int a,int b){
	return (a>=b)?a:b;
}

int max(int a,int b, int c){
	return max2(max2(a,b),c); 	//Best way.
}

int main(){
	int a=1,b=2,b=3;
	max(a,b,c);
}