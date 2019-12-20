import sys

date = 0;
time = 0;
name = '';
times = [];
names = [];
l_year = 0;
l_month = 0;
l_day = 0;
l_ampm = '';
l_hour = 0;
l_minute = 0;
input_date = '';
input_year = 0;
input_month = 0;
input_day = 0;
input_time = 0;
eslines = [];


f = open("./uploads/uploaded_file.txt", 'r', encoding='UTF-8')
lines = f.readlines()
member = lines[3][:-1].split('|')
matrix = [0] * len(member)

for l in lines:
    if (l[:5] == "-----"):  # date
        l = l.split('-' * 15)[1][1:-1]
        l_month = int(l.split('월')[0].split('년 ')[1])
        l_day = int(l.split('월 ')[1].split('일')[0])
        l_year = int(l.split('년')[0])
        date = l_year * 365 + l_month * 30 + l_day  # set date

    elif (l.split(']')[0][1:] in member):  # chat
        name = l.split(']')[0][1:]
        l_1 = l
        l = l.split('] [')[1]
        l_ampm = l[0:2]
        l_hour, l_minute = l[3:].split(']')[0].split(':')
        l_hour = int(l_hour)
        l_minute = int(l_minute)

        if (l_ampm == '오후' and l_hour != 12):
            l_hour += 12
        elif (l_ampm == '오전' and l_hour == 12):
            l_hour = 0

        time = l_minute + l_hour * 60 + date * 24 * 60
        eslines.append(l_1)
        times.append(time)
        names.append(name)


for i in range(len(times)):
   matrix[member.index(names[i])] += 1

print("<p><b>count of talking</b></p><ul>",end='')
for i in range(len(member)):
    print("<li>%s : %d</li>" % (member[i][0:3], matrix[i]), end='')
print('</ul>')


'''
input_date = sys.argv
a = input_date
input_year = int(a[1])
input_month = int(a[2])
input_day = int(a[3])
input_time = 24 * 60 * (input_year * 365 + input_month * 30 + input_day)


print('<{}년 {}월 {}일>'.format(input_year, input_month, input_day))
print('', end=' ')
for i in range(len(times)):
    if(times[i]>=input_time and times[i]<=(input_time + 24 * 60)):
        print(eslines[i], end=' ')









'''





